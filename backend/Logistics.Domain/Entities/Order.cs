using JetBrains.Annotations;
using Logistics.Domain.ValueObjects;

namespace Logistics.Domain.Entities;

public class Order
{
    public Guid Id { get; private set; }
    public Address SenderAddress { get; private set; }
    public Address ReceiverAddress { get; private set; }
    public double Weight { get; private set; }
    public DateTime PickupDate { get; private set; }

    [UsedImplicitly]
    private Order() { }

    public Order(Address senderAddress, Address receiverAddress, double weight, DateTime pickupDate)
    {
        Id = Guid.NewGuid();
        SenderAddress = senderAddress ?? throw new ArgumentNullException(nameof(senderAddress));
        ReceiverAddress = receiverAddress ?? throw new ArgumentNullException(nameof(receiverAddress));
        
        if (weight <= 0)
            throw new ArgumentException("Weight must be greater than zero.", nameof(weight));
        Weight = weight;
        
        PickupDate = pickupDate.ToUniversalTime();
    }
}
