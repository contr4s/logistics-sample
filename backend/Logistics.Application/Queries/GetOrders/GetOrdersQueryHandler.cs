using Logistics.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Logistics.Application.Queries.GetOrders;

public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, List<OrderDto>>
{
    private readonly IApplicationDbContext _context;

    public GetOrdersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<OrderDto>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        return _context.Orders
            .AsNoTracking()
            .Select(o => new OrderDto(
                o.Id,
                o.SenderAddress.City,
                o.SenderAddress.AddressLine,
                o.ReceiverAddress.City,
                o.ReceiverAddress.AddressLine,
                o.Weight,
                o.PickupDate
            ))
            .ToListAsync(cancellationToken);
    }
}
