import timeAgo from "@/utils/timeAgo.js";

export const mapInbox = (application) => ({
  id: application._id,

  subject: application.collabId.title,

  time: timeAgo(application.createdAt),

  message: application.message,

  status: application.status,

  sender: {
    id: application.userId._id,
    name: application.userId.username,
    avatar: application.userId.photo_profile_url,
  },

  collaboration: {
    id: application.collabId._id,
    title: application.collabId.title,
  },
});

export const mapInboxList = (applications) => applications.map(mapInbox);
