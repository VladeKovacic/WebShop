using System;

namespace Api.Helpers
{
    public class JwtSettings
    {
        public static string JwtSettingsSectionName => "JwtSettings";
        public string Secret { get; set; }
        public TimeSpan TokenLifetime { get; set; }
    }
}