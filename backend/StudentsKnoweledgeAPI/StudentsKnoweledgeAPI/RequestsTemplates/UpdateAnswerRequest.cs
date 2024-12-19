public class UpdateAnswerRequest
{
    public IEnumerable<IFormFile>? Files { get; set; } 
    private string? _comment; 

    public string? Comment
    {
        get => _comment;
        set => _comment = string.IsNullOrWhiteSpace(value) ? string.Empty : value; 
    }
}

