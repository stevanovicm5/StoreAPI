using FluentValidation;
using BusinessLogicLayer.DTOs.User;

namespace BusinessLogicLayer.Validators;

public class CreateUserValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Name is required.")
            .Must(name => name != null && name == name.Trim()).WithMessage("Name cannot start or end with spaces.")
            .Must(name => name != null && !name.Contains("  ")).WithMessage("Name cannot contain multiple consecutive spaces.")
            .Must(name => name != null && name.Trim().Length >= 2).WithMessage("Name must be at least 2 characters.")
            .Must(name => name != null && name.Trim().Length <= 100).WithMessage("Name cannot exceed 100 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .Must(email => email == email.Trim()).WithMessage("Email cannot start or end with spaces.")
            .Must(email => email == email.ToLowerInvariant()).WithMessage("Email must be in lowercase.")
            .EmailAddress().WithMessage("Invalid email format.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.");
    }
}