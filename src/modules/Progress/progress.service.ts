import { UserProgress } from './progress.model';

const markLectureComplete = async (userId: string, lectureId: string) => {
  const alreadyCompleted = await UserProgress.findOne({ userId, lectureId });
  if (alreadyCompleted) return alreadyCompleted;

  return await UserProgress.create({ userId, lectureId });
};

const getCompletedLecturesByCourse = async (userId: string, lectureIds: string[]) => {
  const result = await UserProgress.find({
    userId,
    lectureId: { $in: lectureIds },
  });

  return result.map(item => item.lectureId);
};

export const ProgressService = {
  markLectureComplete,
  getCompletedLecturesByCourse,
};
