namespace Api.Helpers
{
    public class CloudinarySettings
    {
        public static string CloudinarySettingsSectionName => "CloudinarySettings";
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}