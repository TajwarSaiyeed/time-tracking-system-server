const asyncHandler = require("express-async-handler");
const getPrisma = require("../lib/prisma");

/**
 * @desc    Create a new time entry
 * @route   POST /api/time-entry/create
 * @access  PRIVATE
 */

const createTimeEntry = asyncHandler(async (req, res) => {
  const prisma = getPrisma();
  const { date, startTime, endTime, notes, userId } = req.body;

  if (!date || !startTime || !endTime || !notes || !userId) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const startTimeStr = new Date(`${date}T${startTime}`);
  const endTimeStr = new Date(`${date}T${endTime}`);

  try {
    const newTimeEntry = await prisma.timeEntry.create({
      data: {
        date: new Date(date),
        startTime: startTimeStr,
        endTime: endTimeStr,
        notes,
        userId,
      },
    });

    res.status(201).json(newTimeEntry);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * @desc    Get all time entries for a week
 * @route   POST /api/time-entry/weekly
 * @access  PRIVATE
 *
 */

const getTimeEntries = asyncHandler(async (req, res) => {
  const prisma = getPrisma();
  const { startDate, endDate } = req.query;
  const { userId } = req.body;

  if (!startDate || !endDate) {
    res.status(400);
    throw new Error("Please provide start and end dates.");
  }

  try {
    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        userId: userId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
      },
    });

    res.status(200).json(timeEntries);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
module.exports = {
  createTimeEntry,
  getTimeEntries,
};
