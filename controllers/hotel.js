import Hotel from "../models/Hotel.js";
import { TYPE_IMAGES } from "./constants.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const makeCaseInsensitive = (val) => new RegExp(`^${val}$`, 'i');

export const getHotels = async (req, res, next) => {
  const { min, max, limit, city, ...others } = req.query;

  const findParams = {
    ...others,
    cheapestPrice: { $gt: min | 1, $lt: max || 999 },
  };
  if (city) findParams.city = makeCaseInsensitive(city);
  
  try {
    const hotels = await Hotel.find(findParams).limit(limit);
    const clearedHotels = hotels.map(el => {
      const hotel = el._doc;
      const { _id: id } = hotel;
      delete hotel._id;
      delete hotel.__v;
      return { id, ...hotel }
    });
    res.status(200).json(clearedHotels);
  } catch (err) {
    next(err);
  }
};

// COUNT BY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((rawCity) => {
        const city = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// todo: Images ==> Admin panel!
export const countByType = async (_req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount, imgSrc: TYPE_IMAGES[0] },
      { type: "apartments", count: apartmentCount, imgSrc: TYPE_IMAGES[1] },
      { type: "resorts", count: resortCount, imgSrc: TYPE_IMAGES[2] },
      { type: "villas", count: villaCount, imgSrc: TYPE_IMAGES[3] },
      { type: "cabins", count: cabinCount, imgSrc: TYPE_IMAGES[4] },
    ]);
  } catch (err) {
    next(err);
  }
};
