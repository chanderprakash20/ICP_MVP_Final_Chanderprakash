
import { Principal } from '@dfinity/principal';
// Import declarations for dk_backend (if needed)
import { dk_backend } from "../../declarations/dk_backend";
window.addEventListener("load", function () {
    console.log("Finished Loading");
  }
);
// Create a shipment
const createShipment = async function createShipment() {
  const senderText = document.getElementById("sender").value;
  const receiverText = document.getElementById("receiver").value;

  const sender = Principal.fromText(senderText);
  const receiver = Principal.fromText(receiverText);

  return new Promise(async (resolve, reject) => {
    try {
      const index = await dk_backend.createShipment(sender, receiver);
      console.log(`Shipment created with index: ${index}`);
      console.log(`Sender: ${sender}, Receiver: ${receiver}`);
      resolve(index);
    } catch (error) {
      console.error('Error creating shipment:', error);
      reject(error);
    }
  });
}
document.getElementById('createShipmentButton').addEventListener('click', async function() {
  try {
    const index = await createShipment();
    // You can use the 'index' here for further processing if needed.
  } catch (error) {
    // Handle the error here, if necessary.
  }
});
// Deliver a shipment
const deliverShipment = async function deliverShipment() {
  const senderText = document.getElementById("sender").value;
  const receiverText = document.getElementById("receiver").value;
  const index = document.getElementById("shipmentIndex").value; // Assuming you have an input field for the shipment index

  const sender = Principal.fromText(senderText);
  const receiver = Principal.fromText(receiverText);

  return new Promise(async (resolve, reject) => {
    // Check if the index is a valid number
    if (!isNaN(index) && index !== null) {
      try {
        const result = await dk_backend.deliverShipment(sender, receiver, parseInt(index));
        console.log(`Shipment Delivered successfully with index: ${index}`);
        console.log(`Sender: ${sender}, Receiver: ${receiver}`);
        resolve(result);
      } catch (error) {
        console.error('Error delivering shipment:', error);
        reject(error);
      }
    } else {
      const error = 'Invalid shipment index provided.';
      console.error(error);
      reject(error);
    }
  });
};
document.getElementById('deliverShipmentButton').addEventListener('click', async function() {
  try {
    const result = await deliverShipment();
    // You can use the 'result' here for further processing if needed.
  } catch (error) {
    // Handle the error here, if necessary.
  }
});
// Get shipments
async function getShipments() {
  const senderText = document.getElementById("sender").value;
  const receiverText = document.getElementById("receiver").value;

  const sender = Principal.fromText(senderText);
  const receiver = Principal.fromText(receiverText);
  try {
    const shipments = await dk_backend.getShipments(sender, receiver);

    if (shipments && shipments.length > 0) {
      // Log the shipment information to the console
      shipments.forEach((shipment, index) => {
        console.log(`Shipment #${index}:`);
        console.log(`Sender: ${shipment.shipment.sender}`);
        console.log(`Receiver: ${shipment.shipment.receiver}`);
        console.log(`Status: ${shipment.shipment.status}`);
        console.log(`Is Paid: ${shipment.shipment.isPaid}\n`);
      });
    } else {
      console.log("No shipments found for the specified sender and receiver.");
    }
  } catch (error) {
    console.error('Error getting shipments:', error);
  }
}
document.getElementById('getShipmentButton').addEventListener('click', function() {
  getShipments();
});


