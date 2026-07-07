export function mapPostPayload(formData, mediaUrls, mediaPublicIds) {
    return {
        title: formData.title,
        description: formData.description,
        portfolioType: formData.portfolioType,
        externalUrl: formData.externalUrl,
        mediaUrls,
        mediaPublicIds
    };
}

