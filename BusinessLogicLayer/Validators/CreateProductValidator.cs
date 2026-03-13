using System;
using BusinessLogicLayer.DTOs.Product;
using FluentValidation;

namespace BusinessLogicLayer.Validators;

public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    private const int MaxNameLength = 200;
    public CreateProductValidator()
    {



        RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(MaxNameLength).WithMessage($"Name cannot exceed {MaxNameLength} characters.");

        RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(200).WithMessage("Description cannot exceed 200 characters.");

        RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0.");

        RuleFor(x => x.Stock)
                .GreaterThanOrEqualTo(0).WithMessage("Stock must be greater than or equal to 0.");
    }

}
