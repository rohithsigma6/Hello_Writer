

const STORAGE_KEY = "dailyTimerData";

export function loadLocalTimerData(fileId: string, versionId: string) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed?.[fileId]?.[versionId] || null;
}

export function saveLocalTimerData(fileId: string, versionId: string, date: string, data: any) {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    const versionData = {
        ...(parsed[fileId]?.[versionId] || {}),
        [date]: data,
    };

    const updated = {
        ...parsed,
        [fileId]: {
            ...(parsed[fileId] || {}),
            [versionId]: versionData,
        },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function removeOldTimerData(fileId: string, versionId: string, date: string) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    delete parsed?.[fileId]?.[versionId]?.[date];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}
