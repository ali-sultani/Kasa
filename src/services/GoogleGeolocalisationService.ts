import axios from 'axios';

export class GoogleGeolocalisationService {

    private static GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Replace with your actual PositionStack access key

    public static async getDistance(origin: string, destination: string): Promise<number> {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                origins: origin,
                destinations: destination,
                key: this.GOOGLE_API_KEY,
                },
            });

            const distanceValue = response.data.rows[0].elements[0].distance.value * 0.001;

            return distanceValue;
        } catch (error) {
            throw new Error(`Error calculating latitude and longitude: ${error}`);
        }
    }
}
