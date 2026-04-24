using Logistics.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Logistics.Application.Queries.GetOrderById;

public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
{
    private readonly IApplicationDbContext _context;

    public GetOrderByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        return _context.Orders
            .AsNoTracking()
            .Where(o => o.Id == request.Id)
            .Select(o => new OrderDto(
                o.Id,
                o.SenderAddress.City,
                o.SenderAddress.AddressLine,
                o.ReceiverAddress.City,
                o.ReceiverAddress.AddressLine,
                o.Weight,
                o.PickupDate
            ))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
