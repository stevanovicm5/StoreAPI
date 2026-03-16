using System;
using BusinessLogicLayer.DTOs.Product;
using FluentValidation;

namespace BusinessLogicLayer.Validators;

public class UpdateProductValidator : AbstractValidator<UpdateProductDto>
{
    public UpdateProductValidator()
    {
        RuleFor(x => x.Name)
            .Must(name => name is not null && name == name.Trim()).WithMessage("Name cannot start or end with spaces.")
            .Must(name => name is not null && !name.Contains("  ")).WithMessage("Name cannot contain multiple consecutive spaces.")
            .Must(name => name is not null && name.Trim().Length >= 2).WithMessage("Name must be at least 2 characters.")
            .Must(name => name is not null && name.Trim().Length <= 50).WithMessage("Name cannot exceed 50 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Name));

        RuleFor(x => x.Description)
            .Must(description => description is not null && description == description.Trim()).WithMessage("Description cannot start or end with spaces.")
            .Must(description => description is not null && !description.Contains("  ")).WithMessage("Description cannot contain multiple consecutive spaces.")
            .Must(description => description is not null && description.Trim().Length >= 2).WithMessage("Description must be at least 2 characters.")
            .Must(description => description is not null && description.Trim().Length <= 200).WithMessage("Description cannot exceed 200 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.")
            .When(x => x.Price is not null);

        RuleFor(x => x.Stock)
            .GreaterThanOrEqualTo(0).WithMessage("Stock cannot be negative.")
            .When(x => x.Stock is not null);

        RuleFor(x => x)
         .Must(dto =>
             !string.IsNullOrWhiteSpace(dto.Name) ||
             !string.IsNullOrWhiteSpace(dto.Description) ||
             dto.Price is not null ||
             dto.Stock is not null)
         .WithMessage("At least one of Name, Description, Price, or Stock must be provided.");
    }

}
