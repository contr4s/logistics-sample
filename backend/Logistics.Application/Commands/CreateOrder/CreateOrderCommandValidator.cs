using FluentValidation;

namespace Logistics.Application.Commands.CreateOrder;

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.SenderCity).NotEmpty().WithMessage("Sender City is required.");
        RuleFor(x => x.SenderAddressLine).NotEmpty().WithMessage("Sender Address is required.");
        RuleFor(x => x.ReceiverCity).NotEmpty().WithMessage("Receiver City is required.");
        RuleFor(x => x.ReceiverAddressLine).NotEmpty().WithMessage("Receiver Address is required.");
        RuleFor(x => x.Weight).GreaterThan(0).WithMessage("Weight must be greater than zero.");
        RuleFor(x => x.PickupDate).NotEmpty().WithMessage("Pickup Date is required.");
    }
}
