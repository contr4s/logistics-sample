namespace Logistics.Application.Queries;

public record OrderDto(
    Guid Id,
    string SenderCity,
    string SenderAddressLine,
    string ReceiverCity,
    string ReceiverAddressLine,
    double Weight,
    DateTime PickupDate
);
