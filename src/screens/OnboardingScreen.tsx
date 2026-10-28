import { WelcomeLanding } from '../components/WelcomeLanding';
import { Text } from '../components/LocalizedText';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Card, Icon, Meter, typography as t } from '../components/UI';
import { challenges, defaultLearner, goals, LearnerProfile } from '../domain/learningPlan';
import { colors as c } from '../theme';
export function OnboardingScreen({ initial, saving, error, onSave, onCancel, onStepChange }: { onStepChange: () => void; initial: LearnerProfile | null; saving: boolean; error: string; onSave: (p: LearnerProfile) => Promise<void>; onCancel?: () => void }) {
  const [step, setStep] = useState(initial ? 1 : 0);
  const [draft, setDraft] = useState(initial ?? defaultLearner);
  const go = (next: number) => { setStep(next); onStepChange(); };
  const update = (value: Partial<LearnerProfile>) => setDraft(current => ({ ...current, ...value }));
  return <View style={{ gap: 24, width: '100%', maxWidth: step === 0 ? 1100 : 720, alignSelf: 'center', paddingBottom: 24 }}>
    {step === 0 ? <WelcomeLanding onStart={() => go(1)} /> : <>
      <View style={{ gap: 12 }}><Text style={t.eyebrow}>SIZNI YAXSHIROQ BILIB OLAYLIK · {step} / 4</Text><View style={{ flexDirection: 'row', gap: 8 }}>{[1, 2, 3, 4].map(n => <View key={n} style={{ flex: 1, height: 5, borderRadius: 5, backgroundColor: n <= step ? c.lime : c.border }} />)}</View><Text style={t.title}>{['', 'Maqsadingizni belgilang', 'Hozir qayerdasiz?', 'Qancha vaqt ajratasiz?', 'Nimaga e’tibor beramiz?'][step]}</Text><Text style={t.body}>To‘g‘ri yoki noto‘g‘ri javob yo‘q. Rejani keyin o‘zgartirish mumkin.</Text></View>
      <Card>
        {step === 1 && <><Text style={t.heading}>Ingliz tili sizga nima uchun kerak?</Text><Choices value={draft.goal} options={Object.entries(goals)} onChange={goal => update({ goal: goal as LearnerProfile['goal'] })} disabled={saving} /><Text style={t.small}>Ism kiritish shart emas. Xohlasangiz, keyin Profil’da nom qo‘shishingiz mumkin.</Text></>}
        {step === 2 && <><Text style={t.heading}>Qaysi ta’rif sizga yaqin?</Text><Choices value={draft.level} options={ [['A1', 'A1 · Oddiy so‘zlar va juda qisqa gaplar'], ['A2', 'A2 · Tanish mavzuda sodda suhbat'], ['B1', 'B1 · Fikrimni sabab va misollar bilan aytaman'], ['B2', 'B2 · Murakkab mavzuda fikrni asoslay olaman']] } onChange={level => update({ level: level as LearnerProfile['level'] })} disabled={saving} /><Text style={t.small}>Bu o‘z-o‘zingizni baholash. Ishonchingiz komil bo‘lmasa A1’dan boshlang va darslar oson bo‘lsa darajani o‘zgartiring.</Text></>}
        {step === 3 && <><Text style={t.heading}>Haftasiga necha kun?</Text><Choices value={String(draft.days)} options={[2, 3, 5, 7].map(n => [String(n), `${n} kun`])} onChange={v => update({ days: Number(v) as LearnerProfile['days'] })} disabled={saving} /><Text style={t.heading}>Har mashg‘ulotga qancha vaqt?</Text><Choices value={String(draft.minutes)} options={[10, 20, 30, 60].map(n => [String(n), `${n} daqiqa${n === 60 ? ' · 1 soat' : ''}`])} onChange={v => update({ minutes: Number(v) as LearnerProfile['minutes'] })} disabled={saving} /><Text style={t.small}>Haqiqatan ajrata oladigan vaqtni tanlang. Kuniga 10 daqiqa ham yaxshi boshlanish.</Text></>}
        {step === 4 && <><Text style={t.heading}>Gapirishda asosiy qiyinchilik?</Text><Choices value={draft.challenge} options={Object.entries(challenges)} onChange={v => update({ challenge: v as LearnerProfile['challenge'] })} disabled={saving} /><Text style={t.heading}>Birinchi natijani qachon ko‘rib chiqamiz?</Text><Choices value={String(draft.weeks)} options={[4, 8, 12].map(n => [String(n), `${n} haftalik maqsad`])} onChange={v => update({ weeks: Number(v) as LearnerProfile['weeks'] })} disabled={saving} /><Text style={t.small}>Avval 4 haftalik boshlang‘ich yo‘l ko‘rsatiladi. Tanlangan muddatda odat va javoblaringizni qayta baholaysiz; muayyan darajaga chiqish va’da qilinmaydi.</Text></>}
      </Card>
      {!!error && <Text accessibilityRole="alert" style={{ color: c.danger }}>{error}</Text>}
      <Button title={saving ? 'Rejangiz saqlanmoqda…' : step === 4 ? 'Shaxsiy rejamni yaratish' : 'Davom etish'} disabled={saving} icon="arrow-forward" onPress={() => { if (step < 4) go(step + 1); else void onSave(draft); }} />
      <Pressable accessibilityRole="button" disabled={saving} onPress={() => go(step - 1)} style={{ alignSelf: 'center', padding: 12 }}><Text style={t.body}>← Ortga</Text></Pressable>
    </>}
    {onCancel && <Pressable accessibilityRole="button" disabled={saving} onPress={onCancel} style={{ alignSelf: 'center', padding: 12 }}><Text style={t.small}>O‘zgartirmasdan qaytish</Text></Pressable>}
    <Text style={[t.small, { textAlign: 'center' }]}>Parol, telefon raqam yoki to‘lov kartasi so‘ralmaydi.</Text>
  </View>;
}
function Choices({ options, value, onChange, disabled }: { options: string[][]; value: string; onChange: (v: string) => void; disabled: boolean }) {
  return <View style={{ gap: 10 }}>{options.map(([id, label]) => <Pressable key={id} disabled={disabled} accessibilityRole="radio" accessibilityState={{ checked: id === value, disabled }} onPress={() => onChange(id!)} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 16, borderWidth: 1, borderColor: value === id ? c.lime : c.border, borderRadius: 12, backgroundColor: value === id ? c.limeDark : c.background }}><Icon name={value === id ? 'radio-button-on' : 'radio-button-off'} size={20} color={value === id ? c.lime : c.muted} /><Text style={[t.body, { color: value === id ? c.text : c.muted, flex: 1 }]}>{label}</Text></Pressable>)}</View>;
}
