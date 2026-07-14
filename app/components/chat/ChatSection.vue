<script setup lang="ts">
const {
  MAX_CHARS,
  step,
  loading,
  error,
  visitorName,
  nameDraft,
  suggestions,
  quota,
  messages,
  remaining,
  limited,
  banned,
  startExplore,
  chooseAnonymous,
  submitName,
  askSuggestion,
  sendMessage,
  resetToIntro,
} = useChat()
</script>

<template>
  <section id="meet-dat" class="section meet">
    <div class="container">
      <RevealOnScroll>
        <SectionHeading
          vi
          label="Meet Dat AI"
          title="Đạt là AI — thử tìm hiểu anh ấy"
          lead="Một góc tương tác nhỏ: hỏi về kinh nghiệm, skill và cách liên hệ. Có giới hạn câu hỏi mỗi ngày để giữ vibe vui và gọn."
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div class="stage">
          <div v-if="banned && step === 'intro'" class="intro banned">
            <p>
              Tài khoản chat của bạn đã bị khóa vì ngôn từ không phù hợp. Hãy giữ thái độ lịch sự.
            </p>
          </div>

          <div v-else-if="step === 'intro'" class="intro">
            <p>
              Muốn “phỏng vấn” Đạt theo kiểu nhanh và hài hước? Bấm bên dưới — trước hết cho mình biết bạn là ai.
            </p>
            <button class="btn btn-primary cta" type="button" @click="startExplore">
              Đạt là AI, thử tìm hiểu anh ấy
            </button>
          </div>

          <ChatNameGate
            v-else-if="step === 'name' || step === 'anonymous'"
            v-model:name-draft="nameDraft"
            :anonymous="step === 'anonymous'"
            :error="error"
            @submit="submitName"
            @anonymous="chooseAnonymous"
            @back="resetToIntro"
          />

          <ChatRoom
            v-else
            :messages="messages"
            :suggestions="suggestions"
            :loading="loading"
            :limited="limited"
            :banned="banned"
            :remaining="remaining"
            :quota="quota"
            :max-chars="MAX_CHARS"
            :visitor-name="visitorName"
            @send="sendMessage"
            @select-suggestion="askSuggestion"
          />
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>

<style scoped>
.meet {
  background: linear-gradient(180deg, transparent, rgba(250, 245, 255, 0.7), transparent);
}

.stage {
  padding: 1.5rem 0 0;
  border-top: 1px solid var(--color-line);
}

.intro {
  display: grid;
  gap: 1.1rem;
  max-width: 36rem;
}

.intro p {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 1.05rem;
}

.cta {
  justify-self: start;
}

.intro.banned p {
  color: #9a3412;
  font-weight: 600;
}
</style>
