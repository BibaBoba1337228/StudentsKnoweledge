public class UpdateAnswerRequest
{
    public IEnumerable<IFormFile>? Files { get; set; } // Сделали поле nullable, чтобы оно стало необязательным
    private string? _comment; // Приватное поле для хранения значения

    public string? Comment
    {
        get => _comment;
        set => _comment = string.IsNullOrWhiteSpace(value) ? string.Empty : value; // Если передано null или пустая строка, сохраняем ""
    }
}

