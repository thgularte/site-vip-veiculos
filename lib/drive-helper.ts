export function extractGoogleDriveId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Check if it's already just a Google Drive ID (25 to 35 characters of alphanumeric, hyphens, underscores)
  if (/^[-a-zA-Z0-9_]{25,35}$/.test(trimmed)) {
    return trimmed;
  }
  // Check for common Google Drive URL patterns:
  // /file/d/{ID}
  // /open?id={ID}
  // /uc?id={ID}
  // /thumbnail?id={ID}
  // /d/{ID}
  // id={ID}
  const regex = /(?:file\/d\/|open\?id=|uc\?id=|thumbnail\?id=|\/d\/|id=)([-a-zA-Z0-9_]{25,35})/;
  const match = trimmed.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export function formatGoogleDriveUrl(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  const fileId = extractGoogleDriveId(trimmed);
  if (fileId) {
    // Google's high-speed CDN URL for public Drive photos
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return trimmed;
}

export function getDriveThumbnailFallback(urlOrId: string): string {
  if (!urlOrId) return "";
  const fileId = extractGoogleDriveId(urlOrId);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }
  return urlOrId;
}

export function isGoogleDriveUrl(url: string): boolean {
  if (!url) return false;
  return url.includes("drive.google.com") || url.includes("googleusercontent.com") || (!!extractGoogleDriveId(url) && !url.startsWith("data:") && !url.startsWith("/"));
}

/**
 * Resizes and compresses an image file to a lightweight DataURL (Base64)
 * Perfect for storing directly in localStorage without exceeding quotas!
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
