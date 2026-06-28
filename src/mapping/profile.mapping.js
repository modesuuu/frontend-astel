export function profileMapping(data) {
  if (!data) return null;

  return {
    userId: data.userId,
    username: data.username,
    fullName: data.fullName,

    photo_profile_url: data.photo_profile_url,
    bannerUrl: data.bannerUrl,

    bio: data.bio,
    institusi: data.institusi,

    skills: data.skills ?? [],
    socialMedia: data.socialMedia ?? [],
  };
}

export function feedMapping(feeds = [], profile) {
  return feeds.map((feed) => ({
    _id: feed._id,
    username: profile?.username,
    avatarUrl: profile?.avatar,
    time: feed.createdAt,
    description: feed.description,
    mediaUrls: feed.mediaUrls || [],
    viewCount: feed.viewCount,
    likeCount: feed.likeCount,
    commentCount: feed.commentCount,
    isLiked: feed.isLiked,
  }));
}
