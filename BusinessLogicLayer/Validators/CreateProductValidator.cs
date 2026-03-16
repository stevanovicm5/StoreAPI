using BusinessLogicLayer.DTOs.Product;
using FluentValidation;

namespace BusinessLogicLayer.Validators;

public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
        private const int MaxNameLength = 200;
        public CreateProductValidator()
        {



                RuleFor(x => x.Name)
                        .Cascade(CascadeMode.Stop)
                        .NotEmpty().WithMessage("Name is required.")
                        .Must(name => name != null && name == name.Trim()).WithMessage("Name cannot start or end with spaces.")
                        .Must(name => name != null && !name.Contains("  ")).WithMessage("Name cannot contain multiple consecutive spaces.")
                        .Must(name => name != null && name.Trim().Length >= 2).WithMessage("Name must be at least 2 characters.")
                        .MaximumLength(MaxNameLength).WithMessage($"Name cannot exceed {MaxNameLength} characters.");

                RuleFor(x => x.Description)
                        .Cascade(CascadeMode.Stop)
                        .NotEmpty().WithMessage("Description is required.")
                        .Must(description => description != null && description == description.Trim()).WithMessage("Description cannot start or end with spaces.")
                        .Must(description => description != null && !description.Contains("  ")).WithMessage("Description cannot contain multiple consecutive spaces.")
                        .Must(description => description != null && description.Trim().Length >= 2).WithMessage("Description must be at least 2 characters.")
                        .MaximumLength(200).WithMessage("Description cannot exceed 200 characters.");

                RuleFor(x => x.Price)
                        .GreaterThan(0).WithMessage("Price must be greater than 0.");

                RuleFor(x => x.Stock)
                        .GreaterThanOrEqualTo(0).WithMessage("Stock must be greater than or equal to 0.");
        }

}
