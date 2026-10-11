import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GuidebookTile from '../components/GuidebookTile.jsx'
import Icon from '../components/Icon.jsx'
import PlaceholderBadge from '../components/PlaceholderBadge.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { guidebook, resourceCategories } from '../data/resources.js'
import { localize } from '../utils/localize.js'
import './Resources.css'

/*
 * STUDENT RESOURCES
 * -----------------
 * An information hub built entirely from src/data/resources.js.
 * At the top sits one large tile that opens the PPI Hsinchu guidebook.
 * Adding a category or an item there makes it appear here automatically.
 *
 * Two ways to browse:
 *   1. Category tabs: shows the items of one category.
 *   2. Search box: when it contains text, the tabs are ignored and matching
 *      items from EVERY category are shown together. The search looks at
 *      the text in the language the visitor is currently using.
 *
 * Which category is open is stored in App.jsx (not here) so that the
 * navbar dropdown can open a category.
 */

/* Gathers all the text of one resource, in one language, for the search. */
function getSearchableText(resource, languageCode) {
  return [
    resource.name,
    resource.tag,
    resource.description,
    resource.location,
    resource.notes,
    ...(resource.steps ?? []),
  ]
    .map((text) => localize(text, languageCode))
    .join(' ')
    .toLowerCase()
}

export default function Resources({ activeCategoryId, onCategoryChange }) {
  const { t, i18n } = useTranslation()
  const languageCode = i18n.language

  /*
   * The search remembers which category was open when the visitor typed.
   * As soon as a different category is chosen (from the tabs or the
   * navbar), the old search no longer applies and the box clears itself.
   */
  const [search, setSearch] = useState({ text: '', categoryId: activeCategoryId })
  const searchText = search.categoryId === activeCategoryId ? search.text : ''

  function setSearchText(newText) {
    setSearch({ text: newText, categoryId: activeCategoryId })
  }

  const activeCategory =
    resourceCategories.find((category) => category.id === activeCategoryId) ??
    resourceCategories[0]
  const searchQuery = searchText.trim().toLowerCase()
  const isSearching = searchQuery.length > 0

  // Every item from every category that contains the search text.
  const searchResults = isSearching
    ? resourceCategories.flatMap((category) =>
        category.items
          .filter((resource) =>
            getSearchableText(resource, languageCode).includes(searchQuery),
          )
          .map((resource) => ({
            resource,
            categoryId: category.id,
            categoryTitle: localize(category.title, languageCode),
          })),
      )
    : []

  const categoryTabs = resourceCategories.map((category) => ({
    id: category.id,
    label: localize(category.title, languageCode),
  }))

  return (
    <section id="resources" className="section section--white" aria-labelledby="resources-title">
      <div className="container">
        <SectionHeading
          number="03"
          label={t('resources.label')}
          title={t('resources.title')}
          description={t('resources.description')}
          headingId="resources-title"
        />

        {/* The big guidebook tile. Its content is "guidebook" in src/data/resources.js. */}
        <Reveal>
          <GuidebookTile guidebook={guidebook} />
        </Reveal>

        <Reveal className="resources__toolbar">
          <label className="resources__search">
            <Icon name="search" />
            <span className="visually-hidden">{t('resources.search')}</span>
            <input
              type="search"
              placeholder={t('resources.search')}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>
          <Tabs
            tabs={categoryTabs}
            activeId={activeCategory.id}
            onChange={(categoryId) => {
              // Choosing a category leaves search mode.
              setSearchText('')
              onCategoryChange(categoryId)
            }}
            label={t('resources.categoriesLabel')}
            idPrefix="resources"
            mobileSelect
          />
        </Reveal>

        <PlaceholderBadge className="resources__notice">
          <Icon name="alert" size={14} />
          {t('resources.notice')}
        </PlaceholderBadge>

        {isSearching ? (
          // aria-live announces the number of results to screen readers.
          <div className="resources__results" aria-live="polite">
            <p className="resources__intro">
              {t('resources.results', {
                count: searchResults.length,
                query: searchText.trim(),
              })}
              <button
                type="button"
                className="text-link resources__clear"
                onClick={() => setSearchText('')}
              >
                {t('resources.clearSearch')}
              </button>
            </p>
            <div className="resources__grid">
              {searchResults.map(({ resource, categoryId, categoryTitle }, index) => (
                <ResourceCard
                  key={`${categoryId}-${index}`}
                  resource={resource}
                  categoryTitle={categoryTitle}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            // "key" replays the fade animation whenever the category changes.
            key={activeCategory.id}
            role="tabpanel"
            id="resources-panel"
            aria-labelledby={`resources-tab-${activeCategory.id}`}
            className="fade-up"
          >
            <p className="resources__intro">
              {localize(activeCategory.intro, languageCode)}
            </p>
            <div className="resources__grid">
              {activeCategory.items.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
