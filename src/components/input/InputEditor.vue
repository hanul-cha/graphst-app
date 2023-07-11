<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Ref } from 'vue'

interface InputEditorProps {
  modelValue?: string | null
}

interface InputEditorEmits {
  (_e: 'input:modelValue', _value: string | null): void
}

const props = withDefaults(defineProps<InputEditorProps>(), {
  modelValue: null,
})

const emit = defineEmits<InputEditorEmits>()

const editor: Ref<Editor | null> = ref(null)

function updateContent(updateValue: string | null) {
  emit('input:modelValue', updateValue)
}

onMounted(() => {
  const instance = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something contents …',
      }),
    ],
    onUpdate: ({ editor }) => {
      updateContent(editor.getText() ? editor.getHTML() : null)
    },
  })
  editor.value = instance
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
  <div class="rounded-2xl border">
    <div
      v-if="editor"
      class="flex flex-wrap border-b"
      :style="{
        gridTemplateColumns: 'repeat(auto-fill, 41px)',
      }"
    >
      <div
        class="rounded-tl-2xl p-2"
        :class="{ 'bg-black fill-white': editor.isActive('bold') }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          <IconTextBold class="fill-black" />
        </div>
      </div>
      <div
        class="p-2"
        :class="{ 'bg-black fill-white': editor.isActive('italic') }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          <IconTextItalic class="fill-black" />
        </div>
      </div>
      <div
        class="p-2"
        :class="{ 'bg-black fill-white': editor.isActive('strike') }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          @click="editor?.chain().focus().toggleStrike().run()"
        >
          <IconTextStrike class="fill-black" />
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-black fill-white': editor.isActive('heading', { level: 1 }),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <span class="text-lg font-bold">H1</span>
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-black fill-white': editor.isActive('heading', { level: 2 }),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <span class="text-lg font-bold">H2</span>
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-black fill-white': editor.isActive('heading', { level: 3 }),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <span class="text-lg font-bold">H3</span>
        </div>
      </div>
      <div
        class="p-2"
        :class="{ 'bg-black fill-white': editor.isActive('bulletList') }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleBulletList().run()"
        >
          <IconTextUl class="fill-black" />
        </div>
      </div>
      <div
        class="p-2"
        :class="{ 'bg-black fill-white': editor.isActive('orderedList') }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleOrderedList().run()"
        >
          <IconTextOl class="fill-black" />
        </div>
      </div>
      <div
        class="p-2"
        :class="{ 'bg-black fill-white': editor.isActive('codeBlock') }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleCodeBlock().run()"
        >
          <IconCode class="fill-black" />
        </div>
      </div>
      <div class="p-2">
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center disabled:text-gray-400"
          :disabled="!editor.can().chain().focus().undo().run()"
          @click="editor?.chain().focus().undo().run()"
        >
          <IconBack class="fill-black" />
        </div>
      </div>
      <div class="p-2">
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center disabled:text-gray-400"
          :disabled="!editor.can().chain().focus().redo().run()"
          @click="editor?.chain().focus().redo().run()"
        >
          <IconBack class="rotate-180 fill-black" />
        </div>
      </div>
    </div>
    <template v-if="editor">
      <EditorContent
        :editor="(editor as Editor)"
        class="input-editor-content p-2"
      />
    </template>
  </div>
</template>

<style>
.input-editor-content .editor_placeholder {
  color: #616161;
}
.input-editor-content ul {
  padding: 0 1rem;
  list-style-type: disc;
  list-style-position: inside;
}
.input-editor-content ol {
  padding: 0 1rem;
  list-style-type: decimal;
  list-style-position: inside;
}

.input-editor-content h1 {
  font-weight: 700;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
}
.input-editor-content h2 {
  font-weight: 600;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
}
.input-editor-content h3 {
  font-weight: 500;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
}

.input-editor-content p {
  display: inline;
}

.input-editor-content code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}

.input-editor-content pre {
  background: #0d0d0d;
  color: #fff;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.input-editor-content pre.code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.input-editor-content img {
  max-width: 100%;
  height: auto;
}

.input-editor-content blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(#0d0d0d, 0.1);
}

.ProseMirror-focused {
  border: none;
}

.ProseMirror {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
