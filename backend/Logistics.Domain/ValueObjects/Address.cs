using JetBrains.Annotations;

namespace Logistics.Domain.ValueObjects;

public record Address(string City, string AddressLine)
{
    [UsedImplicitly]
    private Address() : this(string.Empty, string.Empty) { }
}
