document.addEventListener('DOMContentLoaded', async () => {
    const JSON_URL = 'images.json';

    const fetchImages = async () => {
        const response = await fetch(JSON_URL);
        return response.json();
    };

    const displayImages = (images) => {
        const imageGallery = document.getElementById('image-gallery');
        imageGallery.innerHTML = '';

        images.forEach(({ name, tag, url }) => {
            const container = document.createElement('div');
            container.className = 'image-container';

            const img = document.createElement('img');
            img.src = url;
            img.alt = name;
            img.onclick = () => window.open(url, '_blank');

            container.appendChild(img);
            imageGallery.appendChild(container);
        });
    };

    const filterImages = (images, query) => {
        return images.filter(({ tag }) => {
            return tag.some(tagItem => tagItem.toLowerCase().includes(query.toLowerCase()))
        });
    };

    const displayTags = (images, maxTags = 20) => {
        const tagBubbles = document.getElementById('tag-bubbles');
        tagBubbles.innerHTML = '';

        // Get all tags
        const allTags = images.flatMap(({ tag }) => tag);

        // Count frequency of each tag
        const tagCount = allTags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});

        // Sort tags by frequency and slice to get the top tags
        const topTags = Object.keys(tagCount)
            .sort((a, b) => tagCount[b] - tagCount[a])
            .slice(0, maxTags);

        // Create and display tag bubbles
        topTags.forEach(tag => {
            const bubble = document.createElement('div');
            bubble.className = 'tag-bubble';
            bubble.textContent = tag;
            bubble.onclick = () => {
                searchBox.value = tag;
                const filteredImages = filterImages(images, tag);
                displayImages(filteredImages);
            };
            tagBubbles.appendChild(bubble);
        });
    };

    const images = await fetchImages();
    displayImages(images);
    displayTags(images);

    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', () => {
        const filteredImages = filterImages(images, searchBox.value);
        displayImages(filteredImages);
    });
});
