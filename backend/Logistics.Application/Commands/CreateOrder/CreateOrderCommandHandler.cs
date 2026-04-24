using Logistics.Application.Interfaces;
using Logistics.Domain.Entities;
using Logistics.Domain.ValueObjects;
using MediatR;

namespace Logistics.Application.Commands.CreateOrder;

public class CreateOrderCommandHandler(IApplicationDbContext context) : IRequestHandler<CreateOrderCommand, Guid>
{
    public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var senderAddress = new Address(request.SenderCity, request.SenderAddressLine);
        var receiverAddress = new Address(request.ReceiverCity, request.ReceiverAddressLine);

        var order = new Order(
            senderAddress: senderAddress,
            receiverAddress: receiverAddress,
            weight: request.Weight,
            pickupDate: request.PickupDate
        );

        context.Orders.Add(order);
        await context.SaveChangesAsync(cancellationToken);

        return order.Id;
    }
}
