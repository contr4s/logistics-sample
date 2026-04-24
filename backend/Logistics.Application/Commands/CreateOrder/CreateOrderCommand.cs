namespace Logistics.Application.Commands.CreateOrder;

public record CreateOrderCommand(
    string SenderCity,
    string SenderAddressLine,
    string ReceiverCity,
    string ReceiverAddressLine,
    double Weight,
    DateTime PickupDate) : MediatR.IRequest<Guid>;
