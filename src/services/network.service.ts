class NetworkService {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        return response.json();
    }
}

export const networkService = new NetworkService();
