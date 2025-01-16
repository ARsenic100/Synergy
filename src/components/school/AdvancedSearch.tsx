import React, { useState } from 'react';
import { Search, Mic, MapPin } from 'lucide-react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface AdvancedSearchProps {
  onSearch: (term: string) => void;
  onVoiceSearch: (transcript: string) => void;
  suggestions: string[];
}

export function AdvancedSearch({
  onSearch,
  onVoiceSearch,
  suggestions,
}: AdvancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      onVoiceSearch(transcript);
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
              onSearch(e.target.value);
            }}
            placeholder="Search by school name, UDISE code, or location..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleVoiceSearch}
          className={`p-3 rounded-lg ${
            listening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
          } hover:bg-gray-200 transition-colors`}
        >
          <Mic className="h-5 w-5" />
        </button>
        <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
          <MapPin className="h-5 w-5" />
        </button>
      </div>
      {listening && (
        <div className="absolute top-full mt-2 w-full bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">Listening... "{transcript}"</p>
        </div>
      )}
    </div>
  );
}
