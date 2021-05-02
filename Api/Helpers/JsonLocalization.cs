using System.Collections.Generic;

namespace Api.Helpers
{
    public class JsonLocalization
    {
        public string Key { get; set; }
        public Dictionary<string, string> LocalizedValue = new Dictionary<string, string>();

    }
}