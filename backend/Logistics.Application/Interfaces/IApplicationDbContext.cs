using Logistics.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Logistics.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Order> Orders { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
