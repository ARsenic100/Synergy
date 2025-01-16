import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { schoolService } from '../../../services/schoolService';

interface EntitySelectorProps {
  state: string;
  type: 'district' | 'school';
  selected: string[];
  onChange: (entities: string[]) => void;
}

export function EntitySelector({ state, type, selected, onChange }: EntitySelectorProps) {
  const [options, setOptions] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!state) return;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const { schools } = await schoolService.searchSchools(
          '',
          { state, category: '', type: '', performanceBand: '', facilities: [], gradeLevels: [] },
          1,
          1000
        );

        if (type === 'district') {
          const districts = [...new Set(schools.map(s => s.district))].map(d => ({
            id: d,
            name: d
          }));
          setOptions(districts);
        } else {
          setOptions(schools.map(s => ({ id: s.id, name: s.name })));
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [state, type]);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${type === 'district' ? 'districts' : 'schools'}...`}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={(e) => {
                  const newSelected = e.target.checked
                    ? [...selected, option.id]
                    : selected.filter(id => id !== option.id);
                  onChange(newSelected);
                }}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}