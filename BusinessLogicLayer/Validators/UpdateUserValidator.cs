using FluentValidation;
using BusinessLogicLayer.DTOs.User;

namespace BusinessLogicLayer.Validators;

public class UpdateUserValidator : AbstractValidator<UpdateUserDto>
{
    public UpdateUserValidator()
    {
        RuleFor(x => x.Name)
            .Must(name => name is not null && name == name.Trim()).WithMessage("Name cannot start or end with spaces.")
            .Must(name => name is not null && !name.Contains("  ")).WithMessage("Name cannot contain multiple consecutive spaces.")
            .Must(name => name is not null && name.Trim().Length >= 2).WithMessage("Name must be at least 2 characters.")
            .Must(name => name is not null && name.Trim().Length <= 100).WithMessage("Name cannot exceed 100 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Name));

        RuleFor(x => x.Email)
            .Must(email => email is not null && email == email.Trim()).WithMessage("Email cannot start or end with spaces.")
            .EmailAddress().WithMessage("Invalid email format.")
            .When(x => !string.IsNullOrWhiteSpace(x.Email));

        RuleFor(x => x)
     .Must(dto =>
         !string.IsNullOrWhiteSpace(dto.Name) ||
         !string.IsNullOrWhiteSpace(dto.Email))
     .WithMessage("At least one of Name or Email must be provided.");
    }
}