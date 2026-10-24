import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card, Icon, Meter, typography as t } from '../components/UI';
import { VocabularyEntry } from '../domain/vocabulary';
import { useVocabulary } from '../hooks/useVocabulary';
import { colors as c } from '../theme';
const blank = { word: '', meaning: '', example: '' };
export function VocabularyScreen({ notebook, onReview }: { notebook: ReturnType<typeof useVocabulary>; onReview: () => void }) {
  const layout = useResponsiveLayout();
  const [draft, setDraft] = useState(blank);
  const [editing, setEditing] = useState<VocabularyEntry | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'learning' | 'learned'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const learned = notebook.data.entries.filter(e => e.learned).length;
  const entries = notebook.data.entries.filter(e => `${e.word} ${e.meaning} ${e.example}`.toLowerCase().includes(search.trim().toLowerCase()) && (filter === 'all' || e.learned === (filter === 'learned')));
  const reset = () => { setDraft(blank); setEditing(null); };
  const save = async () => {
    const entry: VocabularyEntry = { ...draft, id: editing?.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`, learned: editing?.learned ?? false, createdAt: editing?.createdAt ?? new Date().toISOString() };
    if (await notebook.mutate(entry)) { setNotice(editing ? 'Word updated. Keep making it yours.' : 'A new word, a new possibility. Saved!'); reset(); }
  };
  if (!notebook.ready) return <Card><Text style={t.heading}>Opening your notebook</Text>{notebook.error ? <><Text accessibilityRole="alert" style={t.body}>{notebook.error}</Text><Button title="Try again" onPress={() => { void notebook.reload(); }} /></> : <ActivityIndicator color={c.lime} />}</Card>;
  return <View style={{ gap: 24 }}>
    <View style={{ gap: 10 }}><Text style={t.eyebrow}>COLLECT WORDS. UNLOCK IDEAS.</Text><Text style={t.title}>Words worth keeping<Text style={{ color: c.lime }}>.</Text></Text><Text style={t.body}>Your own little dictionary. Ready for your next conversation.</Text></View>
    <View style={[s.columns, layout.columns]}><View style={[s.aside, layout.pane]}><Card><View style={s.row}><Icon name="book-outline" /><Text style={t.heading}>{editing ? 'Make it clearer' : 'Catch a new word'}</Text></View><Text style={t.body}>Save a word or phrase and give it a little context.</Text>
      {([{ key: 'word', label: 'Word or phrase', max: 80, hint: 'e.g. look forward to' }, { key: 'meaning', label: 'Meaning', max: 300, hint: 'What does it mean to you?' }, { key: 'example', label: 'Example sentence (optional)', max: 500, hint: 'Use it in a sentence of your own.' }] as const).map(field => <View key={field.key} style={{ gap: 8 }}><Text style={t.small}>{field.label}</Text><TextInput accessibilityLabel={field.label} editable={!notebook.saving} value={draft[field.key]} onChangeText={value => { setDraft(current => ({ ...current, [field.key]: value })); setNotice(''); }} maxLength={field.max} multiline={field.key !== 'word'} placeholder={field.hint} placeholderTextColor={c.muted} style={[s.input, field.key !== 'word' && { minHeight: 80, textAlignVertical: 'top' }]} /><Text style={[t.small, { textAlign: 'right' }]}>{draft[field.key].length}/{field.max}</Text></View>)}
      <Button title={notebook.saving ? 'Saving…' : editing ? 'Save changes' : 'Add to my notebook'} icon="add" disabled={notebook.saving || !draft.word.trim() || !draft.meaning.trim()} onPress={() => { void save(); }} />
      {editing && <Button title="Cancel editing" disabled={notebook.saving} onPress={reset} />}
    </Card><Card><Icon name="sparkles-outline" /><Text style={t.heading}>Make the word your own.</Text><Text style={t.body}>Try using a saved word in today’s speaking answer. A real sentence helps it stick.</Text><Meter value={notebook.data.entries.length ? learned / notebook.data.entries.length : 0} /><Text style={t.small}>{learned} learned · {notebook.data.entries.length - learned} still growing</Text></Card></View>
    <View style={[s.main, layout.pane]}>
      <Button title="Review my words" icon="albums-outline" onPress={onReview} /><View style={s.between}><Text style={t.heading}>Your collection</Text><Text style={t.small}>{notebook.data.entries.length} words & phrases</Text></View>
      <TextInput accessibilityLabel="Search vocabulary" value={search} onChangeText={setSearch} placeholder="Search words, meanings or examples…" placeholderTextColor={c.muted} style={s.input} />
      <View style={s.row}>{(['all', 'learning', 'learned'] as const).map(value => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: filter === value }} onPress={() => setFilter(value)} style={[s.chip, filter === value && { borderColor: c.lime, backgroundColor: c.limeDark }]}><Text style={{ color: filter === value ? c.lime : c.muted, textTransform: 'capitalize' }}>{value}</Text></Pressable>)}</View>
      {notebook.error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{notebook.error}</Text>}
      {!!notice && <Text accessibilityLiveRegion="polite" style={{ color: c.lime }}>{notice}</Text>}
      {entries.length === 0 && <Card style={{ alignItems: 'center', paddingVertical: 36 }}><Icon name="leaf-outline" size={40} /><Text style={t.heading}>{notebook.data.entries.length ? 'No words found here' : 'Every word is a new beginning.'}</Text><Text style={[t.body, { textAlign: 'center' }]}>{notebook.data.entries.length ? 'Try a different search or filter.' : 'Add your first word using the form. Your collection grows one discovery at a time.'}</Text>{notebook.data.entries.length > 0 && <Button title="Show all words" onPress={() => { setSearch(''); setFilter('all'); }} />}</Card>}
      {entries.map(entry => <Card key={entry.id} style={editing?.id === entry.id ? { borderColor: c.lime } : undefined}><View style={s.between}><Text selectable style={[t.heading, { flexShrink: 1 }]}>{entry.word}</Text><View style={s.row}><Icon name={entry.learned ? 'checkmark-circle' : 'leaf-outline'} size={16} /><Text style={t.small}>{entry.learned ? 'Learned' : 'Learning'}</Text></View></View><Text selectable style={t.body}>{entry.meaning}</Text>{!!entry.example && <View style={s.quote}><Text selectable style={t.body}>“{entry.example}”</Text></View>}
        <View style={s.between}><Pressable accessibilityRole="button" disabled={notebook.saving} onPress={() => { void notebook.mutate({ ...entry, learned: !entry.learned }).then(ok => { if (ok) { if (editing?.id === entry.id) setEditing({ ...entry, learned: !entry.learned }); setNotice(entry.learned ? 'Back in your learning list.' : 'Look at you grow. Word marked as learned!'); } }); }} style={s.action}><Text style={{ color: c.lime }}>{entry.learned ? 'Keep practicing' : 'Mark as learned'}</Text></Pressable><View style={s.row}><Pressable accessibilityRole="button" disabled={notebook.saving} onPress={() => { setEditing(entry); setDraft({ word: entry.word, meaning: entry.meaning, example: entry.example }); setNotice(''); }} style={s.action}><Text style={t.body}>Edit</Text></Pressable><Pressable accessibilityRole="button" disabled={notebook.saving} onPress={() => setDeleting(entry.id)} style={s.action}><Text style={{ color: c.danger }}>Delete</Text></Pressable></View></View>
        {deleting === entry.id && <View style={s.quote}><Text style={t.body}>Remove “{entry.word}” from your notebook? This cannot be undone.</Text><View style={s.row}><Button title="Remove word" disabled={notebook.saving} onPress={() => { void notebook.mutate(entry, true).then(ok => { if (ok) { setDeleting(null); if (editing?.id === entry.id) reset(); setNotice('Word removed from your notebook.'); } }); }} /><Pressable accessibilityRole="button" disabled={notebook.saving} onPress={() => setDeleting(null)} style={s.action}><Text style={t.body}>Keep it</Text></Pressable></View></View>}
      </Card>)}
      <Text style={t.small}>Only on this device · Your notebook is saved automatically after each change. Vocabulary does not award XP.</Text>
    </View></View>
  </View>;
}
const s = StyleSheet.create({ columns: { flexDirection: 'row', flexWrap: 'wrap', gap: 22, alignItems: 'flex-start' }, aside: { flexGrow: 1, flexBasis: 320, gap: 20 }, main: { flexGrow: 2, flexBasis: 480, gap: 18 }, row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center' }, between: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10 }, input: { backgroundColor: c.background, borderWidth: 1, borderColor: c.border, borderRadius: 12, padding: 14, color: c.text, fontSize: 15, lineHeight: 23 }, chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: c.border }, quote: { backgroundColor: c.background, borderRadius: 12, padding: 16, gap: 12 }, action: { paddingVertical: 10, paddingHorizontal: 4 } });
