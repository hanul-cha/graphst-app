<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Ref } from 'vue'

interface InputEditorProps {
  modelValue?: string | null
  placeholder?: string
  readonly?: boolean
  error?: boolean
}

interface InputEditorEmits {
  (_e: 'update:modelValue', _value: string | null): void
}

const props = withDefaults(defineProps<InputEditorProps>(), {
  modelValue: null,
  placeholder: 'Write something contents …',
  readonly: false,
  error: false,
})

const emit = defineEmits<InputEditorEmits>()

const editor: Ref<Editor | null> = ref(null)

const inputValue = useVModel(props, 'modelValue', emit)

onMounted(() => {
  editor.value = new Editor({
    content: inputValue.value,
    editable: !props.readonly,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
    ],
    onUpdate: async ({ editor }) => {
      if (props.readonly) return
      const onlyText = editor.getText()
      inputValue.value = onlyText ? editor.getHTML() : null
    },
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

watch(
  () => props.modelValue,
  async (value) => {
    const { from = 0, to = 0 } = editor.value?.state.selection ?? {}
    editor.value
      ?.chain()
      .setContent(value ?? '', false, { preserveWhitespace: 'full' })
      .setTextSelection({ from, to })
      .run()
  }
)
</script>

<template>
  <div
    class="w-full bg-white"
    :class="{
      'border-red-500': error,
      'rounded-2xl border': !readonly,
    }"
  >
    <div
      v-if="editor && !readonly"
      class="flex flex-wrap border-b"
      :class="{
        'border-red-500': error,
      }"
      :style="{
        gridTemplateColumns: 'repeat(auto-fill, 41px)',
      }"
    >
      <div
        class="rounded-tl-2xl p-2"
        :class="{
          'bg-current fill-white': editor.isActive('bold'),
          'fill-current': !editor.isActive('bold'),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          <IconTextBold />
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-current fill-white': editor.isActive('italic'),
          'fill-current': !editor.isActive('italic'),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          <IconTextItalic />
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-current fill-white': editor.isActive('strike'),
          'fill-current': !editor.isActive('strike'),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          @click="editor?.chain().focus().toggleStrike().run()"
        >
          <IconTextStrike />
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-current text-white': editor.isActive('heading', { level: 1 }),
          'text-current': !editor.isActive('heading', { level: 1 }),
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
          'bg-current text-white': editor.isActive('heading', { level: 2 }),
          'text-current': !editor.isActive('heading', { level: 2 }),
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
          'bg-current text-white': editor.isActive('heading', { level: 3 }),
          'text-current': !editor.isActive('heading', { level: 3 }),
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
        :class="{
          'bg-current fill-white': editor.isActive('bulletList'),
          'fill-current': !editor.isActive('bulletList'),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleBulletList().run()"
        >
          <IconTextUl />
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-current fill-white': editor.isActive('orderedList'),
          'fill-current': !editor.isActive('orderedList'),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleOrderedList().run()"
        >
          <IconTextOl />
        </div>
      </div>
      <div
        class="p-2"
        :class="{
          'bg-current fill-white': editor.isActive('codeBlock'),
          'fill-current': !editor.isActive('codeBlock'),
        }"
      >
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center"
          @click="editor?.chain().focus().toggleCodeBlock().run()"
        >
          <IconCode />
        </div>
      </div>
      <div class="p-2">
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center disabled:text-gray-400"
          :disabled="!editor.can().chain().focus().undo().run()"
          @click="editor?.chain().focus().undo().run()"
        >
          <IconBack class="fill-current" />
        </div>
      </div>
      <div class="p-2">
        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center disabled:text-gray-400"
          :disabled="!editor.can().chain().focus().redo().run()"
          @click="editor?.chain().focus().redo().run()"
        >
          <IconBack class="rotate-180 fill-current" />
        </div>
      </div>
    </div>
    <template v-if="editor">
      <EditorContent
        :editor="editor"
        :editable="!readonly"
        class="input-editor-content max-h-full overflow-y-auto"
        :class="{
          'p-2': !readonly,
        }"
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
