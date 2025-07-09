import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    timestamp: '10:30 AM',
    isMe: false,
    status: 'read',
  },
  {
    id: '2',
    text: 'I&apos;m doing great! Thanks for asking 😊',
    timestamp: '10:32 AM',
    isMe: true,
    status: 'read',
  },
  {
    id: '3',
    text: 'That&apos;s awesome! What have you been up to lately?',
    timestamp: '10:33 AM',
    isMe: false,
    status: 'read',
  },
  {
    id: '4',
    text: 'Just working on some exciting projects. How about you?',
    timestamp: '10:35 AM',
    isMe: true,
    status: 'read',
  },
  {
    id: '5',
    text: 'Same here! I&apos;d love to hear more about your projects',
    timestamp: '10:36 AM',
    isMe: false,
    status: 'read',
  },
  {
    id: '6',
    text: 'Sure! Let&apos;s catch up over coffee sometime this week?',
    timestamp: '10:38 AM',
    isMe: true,
    status: 'delivered',
  },
];

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();
  
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Get contact info from params
  const contactName = params.name as string || 'Unknown Contact';
  const contactAvatar = params.avatar as string || '👤';
  const isOnline = params.isOnline === 'true';

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate a response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! 👍',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        status: 'read',
      };
      setMessages(prev => [...prev, response]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isMe ? styles.myMessage : styles.theirMessage
    ]}>
      <View style={[
        styles.messageBubble,
        {
          backgroundColor: item.isMe ? colors.primary : colors.surface,
          borderColor: item.isMe ? colors.primary : colors.onSurface + '20',
        }
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.isMe ? colors.surface : colors.onSurface }
        ]}>
          {item.text}
        </Text>
        <View style={styles.messageFooter}>
          <Text style={[
            styles.timestamp,
            { color: item.isMe ? colors.surface + '80' : colors.onSurface + '60' }
          ]}>
            {item.timestamp}
          </Text>
          {item.isMe && (
            <Ionicons
              name={
                item.status === 'read' ? 'checkmark-done' :
                item.status === 'delivered' ? 'checkmark-done' : 'checkmark'
              }
              size={16}
              color={item.status === 'read' ? '#4CAF50' : colors.surface + '80'}
            />
          )}
        </View>
      </View>
    </View>
  );

  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={[styles.messageContainer, styles.theirMessage]}>
        <View style={[
          styles.messageBubble,
          { backgroundColor: colors.surface, borderColor: colors.onSurface + '20' }
        ]}>
          <View style={styles.typingIndicator}>
            <View style={[styles.typingDot, { backgroundColor: colors.onSurface + '40' }]} />
            <View style={[styles.typingDot, { backgroundColor: colors.onSurface + '40' }]} />
            <View style={[styles.typingDot, { backgroundColor: colors.onSurface + '40' }]} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactInfo}>
          <Text style={styles.contactAvatar}>{contactAvatar}</Text>
          <View style={styles.contactDetails}>
            <Text style={[styles.contactName, { color: colors.surface }]}>
              {contactName}
            </Text>
            <Text style={[styles.contactStatus, { color: colors.surface + '80' }]}>
              {isOnline ? 'Online' : 'Last seen recently'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={[styles.messagesList, { backgroundColor: colors.accent + '30' }]}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderTypingIndicator}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.inputContainer, { backgroundColor: colors.surface }]}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity style={[styles.attachButton, { backgroundColor: colors.accent }]}>
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <View style={[styles.textInputContainer, { backgroundColor: colors.accent }]}>
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.onSurface + '60'}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy-outline" size={20} color={colors.onSurface + '60'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons
              name={newMessage.trim() ? "send" : "mic"}
              size={20}
              color={colors.surface}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactAvatar: {
    fontSize: 32,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
  },
  contactStatus: {
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 4,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 4,
    maxHeight: 80,
  },
  emojiButton: {
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
