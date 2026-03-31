export interface EmotionCategory {
  name: string
  icon: string
  color: string
  tagColor: string
  emotions: string[]
}

export const basicEmotions: EmotionCategory[] = [
  {
    name: '快乐',
    icon: '😊',
    color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/25',
    tagColor: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    emotions: ['满足', '喜悦', '自豪', '欣慰'],
  },
  {
    name: '悲伤',
    icon: '😢',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/25',
    tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    emotions: ['失望', '沮丧', '失落', '痛心', '郁闷'],
  },
  {
    name: '愤怒',
    icon: '😤',
    color: 'from-red-500/20 to-orange-500/20 border-red-500/25',
    tagColor: 'bg-red-500/15 text-red-300 border-red-500/30',
    emotions: ['被激怒', '烦躁', '狂怒', '怨恨'],
  },
  {
    name: '恐惧',
    icon: '😰',
    color: 'from-purple-500/20 to-violet-500/20 border-purple-500/25',
    tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    emotions: ['不安', '紧张', '畏惧', '恐怖'],
  },
  {
    name: '厌恶',
    icon: '😣',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/25',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    emotions: ['反感', '恶心', '憎恶', '藐视'],
  },
  {
    name: '惊讶',
    icon: '😲',
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/25',
    tagColor: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
    emotions: ['惊奇', '意外', '惊喜', '震惊'],
  },
]

export const complexEmotions: EmotionCategory[] = [
  {
    name: '社会性情感',
    icon: '🫂',
    color: 'from-slate-500/20 to-gray-500/20 border-slate-500/25',
    tagColor: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
    emotions: ['羞愧', '尴尬', '内疚', '自责', '骄傲', '同情'],
  },
  {
    name: '人际与需求',
    icon: '💫',
    color: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/25',
    tagColor: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
    emotions: ['羡慕', '嫉妒', '渴望', '怀旧', '浪漫', '崇拜'],
  },
  {
    name: '状态与感受',
    icon: '🌊',
    color: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/25',
    tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    emotions: ['焦虑', '兴奋', '冷静', '迷茫', '敬畏', '无聊', '满足'],
  },
]
