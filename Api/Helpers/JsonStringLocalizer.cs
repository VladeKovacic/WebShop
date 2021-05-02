using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace Api.Helpers
{
    public class ErrorLocalizer
    {
        List<JsonLocalization> localization = new List<JsonLocalization>();
        public ErrorLocalizer()
        {
            var options = new JsonSerializerOptions()
            {
                IncludeFields = true,
            };
            localization = JsonSerializer.Deserialize<List<JsonLocalization>>(File.ReadAllText(@"Resources/errorLocalization.json"), options);
        }


        public string this[string name]
        {
            get
            {
                return GetString(name);
            }
        }

        private string GetString(string name)
        {
            var query = localization.Where(l => l.LocalizedValue.Keys.Any(lv => lv == CultureInfo.CurrentCulture.Name));
            var value = query.FirstOrDefault(l => l.Key == name);

            if (value == null) return name;

            return value.LocalizedValue[CultureInfo.CurrentCulture.Name];
        }
    }
}