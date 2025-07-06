import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiEdit3, FiSave, FiRefreshCw, FiEye, FiSettings, FiImage } = FiIcons;

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [content, setContent] = useState({
    hero: {
      title: 'AI Enablement for Small Media Companies Who Want to Control Their Own Destiny',
      subtitle: 'Simple AI frameworks, not complex systems. Guy Tasaka teaches small media companies to harness their biggest advantage: speed. While enterprise media faces implementation challenges, new AI-native entrepreneurs are entering local markets. You can move faster than both.',
      ctaPrimary: 'Watch 15-Minute Demo',
      ctaSecondary: 'Apply for Partnership',
      availabilityText: '2 Partnership Spots',
      urgencyText: 'Up to 3 companies share $3,500 training • Only 5 partnerships at a time'
    },
    authority: {
      title: 'The Media Executive Who\'s Always Been Ahead of the Curve',
      subtitle: 'Guy Tasaka\'s track record of innovation spans enterprise media challenges and small media advantages',
      innovations: [
        { year: '2011', achievement: 'First local paywall' },
        { year: '2014', achievement: 'First local FAST channel' },
        { year: '2024', achievement: 'AI enablement tools' }
      ]
    },
    pricing: {
      individual: {
        price: '$3,500',
        title: 'Individual Focus',
        features: ['Complete customization', 'Exclusive attention', 'Proprietary implementation', 'Premium experience']
      },
      twoCompany: {
        price: '$1,750 each',
        title: 'Collaborative Learning',
        features: ['Cost sharing benefits', 'Peer learning', 'Shared insights', 'Networking opportunities']
      },
      threeCompany: {
        price: '$1,167 each',
        title: 'Maximum Learning',
        features: ['Maximum cost efficiency', 'Diverse perspectives', 'Community building', 'Cross-pollination']
      }
    },
    contact: {
      email: 'guy@iknowag.ai',
      phone: 'Available for partnerships',
      location: 'US Travel Included'
    }
  });

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: FiImage },
    { id: 'authority', label: 'Authority Building', icon: FiEdit3 },
    { id: 'pricing', label: 'Partnership Pricing', icon: FiSettings },
    { id: 'contact', label: 'Contact Information', icon: FiSettings }
  ];

  const handleContentChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      // Save to database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setHasUnsavedChanges(false);
      setIsEditing(false);
      toast.success('Content updated successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  const handleDiscard = () => {
    // Reset to original content
    setHasUnsavedChanges(false);
    setIsEditing(false);
    toast.success('Changes discarded');
  };

  const renderHeroEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
        <textarea
          value={content.hero.title}
          onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="3"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={content.hero.subtitle}
          onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="4"
          disabled={!isEditing}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA</label>
          <input
            type="text"
            value={content.hero.ctaPrimary}
            onChange={(e) => handleContentChange('hero', 'ctaPrimary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA</label>
          <input
            type="text"
            value={content.hero.ctaSecondary}
            onChange={(e) => handleContentChange('hero', 'ctaSecondary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability Text</label>
          <input
            type="text"
            value={content.hero.availabilityText}
            onChange={(e) => handleContentChange('hero', 'availabilityText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Text</label>
          <input
            type="text"
            value={content.hero.urgencyText}
            onChange={(e) => handleContentChange('hero', 'urgencyText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderAuthorityEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.authority.title}
          onChange={(e) => handleContentChange('authority', 'title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={content.authority.subtitle}
          onChange={(e) => handleContentChange('authority', 'subtitle', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          rows="2"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Innovation Timeline</label>
        <div className="space-y-3">
          {content.authority.innovations.map((innovation, index) => (
            <div key={index} className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={innovation.year}
                onChange={(e) => {
                  const newInnovations = [...content.authority.innovations];
                  newInnovations[index].year = e.target.value;
                  handleContentChange('authority', 'innovations', newInnovations);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                placeholder="Year"
                disabled={!isEditing}
              />
              <input
                type="text"
                value={innovation.achievement}
                onChange={(e) => {
                  const newInnovations = [...content.authority.innovations];
                  newInnovations[index].achievement = e.target.value;
                  handleContentChange('authority', 'innovations', newInnovations);
                }}
                className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                placeholder="Achievement"
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPricingEditor = () => (
    <div className="space-y-6">
      {Object.entries(content.pricing).map(([key, pricing]) => (
        <div key={key} className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 capitalize">
            {key === 'twoCompany' ? 'Two Company' : key === 'threeCompany' ? 'Three Company' : key} Partnership
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={pricing.price}
                onChange={(e) => {
                  const newPricing = { ...content.pricing };
                  newPricing[key].price = e.target.value;
                  setContent(prev => ({ ...prev, pricing: newPricing }));
                  setHasUnsavedChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={pricing.title}
                onChange={(e) => {
                  const newPricing = { ...content.pricing };
                  newPricing[key].title = e.target.value;
                  setContent(prev => ({ ...prev, pricing: newPricing }));
                  setHasUnsavedChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-2">
              {pricing.features.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newPricing = { ...content.pricing };
                    newPricing[key].features[index] = e.target.value;
                    setContent(prev => ({ ...prev, pricing: newPricing }));
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
                  disabled={!isEditing}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContactEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={content.contact.email}
          onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone/Availability</label>
        <input
          type="text"
          value={content.contact.phone}
          onChange={(e) => handleContentChange('contact', 'phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location/Travel</label>
        <input
          type="text"
          value={content.contact.location}
          onChange={(e) => handleContentChange('contact', 'location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust-blue focus:border-transparent"
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroEditor();
      case 'authority':
        return renderAuthorityEditor();
      case 'pricing':
        return renderPricingEditor();
      case 'contact':
        return renderContactEditor();
      default:
        return renderHeroEditor();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Content Management</h1>
          <p className="text-gray-600">Edit website content and messaging</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
          )}
          {isEditing ? (
            <>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-trust-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                <span>Edit Content</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Content Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-trust-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={section.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {sections.find(s => s.id === activeSection)?.label}
              </h3>
              {isEditing && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  Editing Mode
                </span>
              )}
            </div>

            {renderActiveSection()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;