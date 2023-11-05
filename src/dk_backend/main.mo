import Time "mo:base/Time";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Error "mo:base/Error";
import Debug "mo:base/Debug";

actor ShipmentManager {
    type ShipmentStatus = { #IN_TRANSIT; #DELIVERED };

    type Shipment = {
        id : Nat;
        sender : Principal;
        receiver : Principal;
        var status : ShipmentStatus;
        var isPaid : Bool;
        var pickupTime : Int;
        var deliveryTime : Int;
    };

    type TypeShipment = {
        id : Nat;
        shipment : Shipment;
        status : ShipmentStatus;
        isPaid : Bool;
    };
    type ErrorHandler= {
        typeShipment:?TypeShipment
    };

    var shipments : List.List<Shipment> = List.nil<Shipment>();
    var typeShipments : List.List<TypeShipment> = List.nil<TypeShipment>();

    public func createShipment(sender : Principal, receiver : Principal) : async Nat {
        let index = List.size(shipments);
        let shipment : Shipment = {
            id = index;
            sender = sender;
            receiver = receiver;
            var status = #IN_TRANSIT;
            var isPaid = false;
            var pickupTime = Time.now();
            var deliveryTime = 0;
        };
        let typeShipment = {
            id = index;
            shipment = shipment;
            status = shipment.status;
            isPaid = shipment.isPaid;
        };
        shipments := List.push(shipment, shipments);
        typeShipments := List.push(typeShipment, typeShipments);
        return index;
    };

    public func deliverShipment(sender : Principal, receiver : Principal, index : Nat) : async Text {
        var shipment : Shipment = switch (List.get(shipments, index)) {
            case (?value) { value };
            case (null) { throw Error.reject("no Data found") };
        };

        shipment.status := #DELIVERED;
        shipment.deliveryTime := Time.now();
        shipments := List.push(shipment, shipments);

        let typeShipment : TypeShipment = {
            id = index;
            shipment = shipment;
            status = shipment.status;
            isPaid = shipment.isPaid;
        };

        typeShipments := List.push(typeShipment,typeShipments);

        return "sucess";
    };

    public func getShipments(sender: Principal, receiver: Principal){
        var typeShipment:[TypeShipment]=List.toArray<TypeShipment>(typeShipments);
        for (shipment in typeShipment.vals()) {
            if (shipment.shipment.sender == sender and shipment.shipment.receiver == receiver) {
               Debug.print(debug_show(shipment));
            }
        };
        return throw  Error.reject("error! no data found");
    };
};