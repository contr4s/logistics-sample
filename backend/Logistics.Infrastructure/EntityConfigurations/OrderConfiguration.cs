using Logistics.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Logistics.Infrastructure.EntityConfigurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.OwnsOne(x => x.SenderAddress, sa =>
        {
            sa.Property(p => p.City).HasColumnName("SenderCity").IsRequired().HasMaxLength(100);
            sa.Property(p => p.AddressLine).HasColumnName("SenderAddressLine").IsRequired().HasMaxLength(200);
        });

        builder.OwnsOne(x => x.ReceiverAddress, ra =>
        {
            ra.Property(p => p.City).HasColumnName("ReceiverCity").IsRequired().HasMaxLength(100);
            ra.Property(p => p.AddressLine).HasColumnName("ReceiverAddressLine").IsRequired().HasMaxLength(200);
        });

        builder.Property(x => x.Weight).IsRequired();
        builder.Property(x => x.PickupDate).IsRequired();
    }
}
