import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const GRAPHQL_API_URL = process.env.API_ENDPOINT;

// Webhook handler
const handleDialogflowWebhook = async (req, res) => {
  try {
    const userBudget = req.body.queryResult.parameters.budget;
    const userLocation = req.body.queryResult.parameters.location;
    const variables = {};
    if (userBudget) {
      variables.max_price = parseFloat(userBudget);
    }
    if (userLocation) {
      variables.location = { city: userLocation };
    }
    const query = `
        query GetPropertiesUnderBudget($maxPrice: Float, $location: LocationFilterInput) {
          properties(filter: { max_price: $maxPrice, location: $location }) {
            id
            title
            price
            description
            size
            location {
              city
              district
              address
            }
          }
        }
      `;
    // Gửi yêu cầu GraphQL tới API
    const response = await axios.post(
      GRAPHQL_API_URL,
      { query, variables },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { properties } = response.data.data;

    const propertiesList = properties.map((property) => ({
      title: property.title,
      price: property.price,
      description: property.description,
      size: property.size,
      location: `${property.location.city}, ${property.location.district}, ${property.location.address}`
    }));

    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [
              'Đây là một số dự án anh/chị có thể quan tâm:',
              ...propertiesList.map(
                (property) =>
                  `${property.title} -Khu vực: ${property.location} - Giá: ${property.price} VND - Diện tích: ${property.size} m²`
              )
            ]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error calling GraphQL API:', error);
    return res.status(500).json({
      fulfillmentMessages: [
        {
          text: {
            text: ['Xin lỗi, có lỗi xảy ra khi lấy dữ liệu bất động sản.']
          }
        }
      ]
    });
  }
};
export default handleDialogflowWebhook;
