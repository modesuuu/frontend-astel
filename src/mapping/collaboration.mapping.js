export function collaborationMapping(collabs = []) {
  return collabs.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,

    image: item.mediaUrls?.[0] || null,

    requiredMember: item.requiredMember,
    status: item.status,
    communicationUrl: item.communicationUrl,
    author: {
      id: item.userId._id,
      username: item.userId.username,
      avatarUrl: item.userId.photo_profile_url,
    },
    time: item.createdAt,
  }));
}

export function collaborationDetailMapping(data) {
  if (!data) return null;

  return {
    id: data._id,

    username: data.ownerId?.username,
    avatarUrl: data.ownerId?.photo_profile_url,
    ownerId: data.ownerId?._id,
    time: data.createdAt,

    title: data.title,
    description: data.description,

    // misal sekarang yang join belum ada datanya
    maxParticipants: `0/${data.requiredMember}`,

    // hanya ambil nama skill
    skills: data.skillsNeeded?.map((skill) => skill.skillName) || [],

    // gallery
    media: data.mediaUrls || [],

    // simpan raw value kalau suatu saat dibutuhkan
    requiredMember: data.requiredMember,
    status: data.status,

    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}
export function mapCollabPayload(formData, mediaUrls) {
  return {
    title: formData.title,
    description: formData.description,
    requiredMember: Number(formData.requiredMember),
    communicationUrl: formData.communicationUrl,
    skillsNeeded: formData.skillsNeeded,
    mediaUrls,
  };
}
