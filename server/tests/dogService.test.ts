import { afterEach, beforeEach, describe,expect,test,vi } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe('dogService.getRandomDogImage',() => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('should return image URL along with status with valid request', async () => {
        const stubbedResponse = {
            "message": "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            "status": "success"
        };

        const stubbedFetch = vi.fn(() => Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(stubbedResponse)
        }));

        vi.stubGlobal('fetch',stubbedFetch);
        const res = await getRandomDogImage();
        expect(res.imageUrl).toBe(stubbedResponse.message);
        expect(res.status).toBe("success");
        expect(fetch).toHaveBeenCalledOnce();
    });
    test('should throw error when call is rejected', async () => {
        const stubbedFetch = vi.fn(() => Promise.resolve({
            ok: false,
            status: 500
        }));

        vi.stubGlobal('fetch',stubbedFetch);
        await expect(() => getRandomDogImage()).rejects.toThrow('Failed to fetch dog image: Dog API returned status 500');
    });
});