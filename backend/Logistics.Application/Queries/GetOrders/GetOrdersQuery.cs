using MediatR;

namespace Logistics.Application.Queries.GetOrders;

public record GetOrdersQuery() : IRequest<List<OrderDto>>;
