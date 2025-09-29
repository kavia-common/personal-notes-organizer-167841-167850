import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { OceanProfessional as T } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Note, Tag } from '../types/note';
import { deleteNote, getNoteById, updateNote, upsertTag } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  NotesList: undefined;
  NoteDetail: { id?: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'NoteDetail'>;

/**
 * PUBLIC INTERFACE
 * NoteDetailScreen: Edit note title, content and tags.
 * Route params:
 * - id?: string (the note id to edit)
 * Actions:
 * - Save, Delete, Add/Remove tags
 */
export const NoteDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const id = route.params?.id;
  const [note, setNote] = React.useState<Note | null>(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [tagInput, setTagInput] = React.useState('');

  React.useEffect(() => {
    (async () => {
      if (!id) return;
      const n = await getNoteById(id);
      if (n) {
        setNote(n);
        setTitle(n.title);
        setContent(n.content);
        setTags(n.tags || []);
      }
    })();
  }, [id]);

  const onSave = async () => {
    if (!note) return;
    const updated = await updateNote(note.id, { title: title.trim() || 'Untitled', content, tags });
    if (updated) {
      navigation.goBack();
    }
  };

  const onDelete = async () => {
    if (!note) return;
    Alert.alert('Delete note', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(note.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const addTag = async () => {
    const name = tagInput.trim();
    if (!name) return;
    const t = await upsertTag(name);
    const exists = tags.some(x => x.id === t.id);
    const next = exists ? tags : [...tags, t];
    setTags(next);
    setTagInput('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined, default: undefined })}
      style={{ flex: 1, backgroundColor: T.background }}
    >
      <Header
        title="Edit Note"
        right={
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Ionicons name="trash" size={22} color={T.error} onPress={onDelete} />
            <Ionicons name="save" size={22} color={T.primary} onPress={onSave} />
          </View>
        }
      />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor={T.mutedText}
          style={styles.title}
        />
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Write your note..."
          placeholderTextColor={T.mutedText}
          style={styles.content}
          multiline
          textAlignVertical="top"
        />
        <Text style={styles.sectionLabel}>Tags</Text>
        <View style={styles.tagsRow}>
          <TextInput
            value={tagInput}
            onChangeText={setTagInput}
            placeholder="Add new tag"
            placeholderTextColor={T.mutedText}
            style={styles.tagInput}
            onSubmitEditing={addTag}
            returnKeyType="done"
          />
          <View style={styles.addButton}>
            <Ionicons name="add-circle" size={24} color={T.secondary} onPress={addTag} />
          </View>
        </View>
        <View style={styles.tagsWrap}>
          {tags.map(t => (
            <View key={t.id} style={[styles.tagChip, { backgroundColor: t.color ?? '#E0E7FF' }]}>
              <Text style={[styles.tagText, { marginRight: 6 }]}>{t.name}</Text>
              <Ionicons
                name="close"
                size={14}
                color="#111827"
                onPress={() => setTags(tags.filter(x => x.id !== t.id))}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    marginTop: spacing.lg,
    color: T.text,
    fontSize: 22,
    fontWeight: '800',
    backgroundColor: T.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: T.border,
  },
  content: {
    marginTop: spacing.lg,
    minHeight: 240,
    color: T.text,
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: T.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: T.border,
  },
  sectionLabel: {
    marginTop: spacing.xl,
    color: T.mutedText,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  tagInput: {
    flex: 1,
    backgroundColor: T.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    color: T.text,
    borderWidth: 1,
    borderColor: T.border,
  },
  addButton: { marginLeft: spacing.md },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    color: '#111827',
    fontWeight: '700',
  },
});
