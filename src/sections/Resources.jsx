import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import EmergencyContacts from '../components/EmergencyContacts.jsx'
import GuidebookTile from '../components/GuidebookTile.jsx'
import Icon from '../components/Icon.jsx'
import PlaceDirectory from '../components/PlaceDirectory.jsx'
import PlaceholderBadge from '../components/PlaceholderBadge.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import ResourceSection from '../components/ResourceSection.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { guidebook } from '../data/resources.js'
import { localize } from '../utils/localize.js'
import {
  countResults,
  filterEntriesByType,
  getFilterTypes,
  getVisibleCategories,
  searchEntries,
} from '../utils/resourceHelpers.js'
import './Resources.css'

/*
 * STUDENT RESOURCES
 * -----------------
 * An information hub built entirely from src/data/resources.js, the
 * listing files it imports (foodAndGroceries.js, localServices.js,
 * healthcareFacilities.js) and the sponsored listings in
 * src/data/localBusinesses.js. At the top sits one large tile that opens the
 * PPI Hsinchu guidebook. Adding an item to those files makes it appear here.
 *
 * Inside a category, entries are drawn as:
 *   Emergency contacts - phone-first cards, always shown first and never
 *                        folded away
 *   Cards              - single resources (guides, official links)
 *   Directories        - sections of places people visit (Indonesian Food
 *                        & Groceries), always open as a grid of photo
 *                        cards with their own type / location / university
 *                        filters, and sponsored places in a "Featured
 *                        Partners" strip above them (PlaceDirectory.jsx)
 *   Sections           - other groups (universities, hospitals, services)
 *                        as one expandable card (ResourceSection.jsx).
 *                        Sponsored places appear at the top of their section.
 *
 * Two ways to browse:
 *   1. Category tabs: shows the entries of one category. When a category
 *      holds more than one type of resource (e.g. restaurants and grocery
 *      stores, including the places inside sections), a row of type
 *      filters appears. Choosing a type keeps only the matching places.
 *   2. Search box: when it contains text, the tabs are ignored and matching
 *      entries from EVERY category are shown together. A matching place is
 *      shown inside its section, which opens automatically and lists only
 *      the places that match (or all of them when the section title
 *      itself matches). The search uses the visitor's current language.
 *
 * Which category is open is stored in App.jsx (not here) so that the
 * navbar dropdown can open a category.
 */

/* The entries described above. Empty blocks are not drawn. */
function ResourceEntries({ entries, categoryTitles, isSearch = false }) {
  const emergency = entries.filter((entry) => entry.layout === 'emergency' && entry.kind === 'card')
  const others = entries.filter((entry) => !emergency.includes(entry))
  // Search results show which category each entry comes from.
  const titleOf = (entry) => (isSearch ? categoryTitles[entry.categoryId] : undefined)

  return (
    <>
      <EmergencyContacts contacts={emergency} />

      {others.length > 0 && (
        <div className="resources__grid">
          {others.map((entry) =>
            entry.kind === 'section' && entry.layout === 'place' ? (
              <PlaceDirectory
                key={entry.key}
                section={entry}
                categoryTitle={titleOf(entry)}
                isSearch={isSearch}
              />
            ) : entry.kind === 'section' ? (
              <ResourceSection
                key={entry.key}
                section={entry}
                categoryTitle={titleOf(entry)}
                defaultOpen={isSearch}
              />
            ) : (
              <ResourceCard key={entry.key} resource={entry} categoryTitle={titleOf(entry)} />
            ),
          )}
        </div>
      )}
    </>
  )
}

export default function Resources({ activeCategoryId, onCategoryChange }) {
  const { t, i18n } = useTranslation()
  const languageCode = i18n.language
  const categories = getVisibleCategories()

  /*
   * The search and the type filter remember which category was open when
   * they were set. As soon as a different category is chosen (from the tabs
   * or the navbar), they no longer apply and reset themselves.
   */
  const [search, setSearch] = useState({ text: '', categoryId: activeCategoryId })
  const searchText = search.categoryId === activeCategoryId ? search.text : ''
  const [typeFilter, setTypeFilter] = useState({ typeId: 'all', categoryId: activeCategoryId })

  function setSearchText(newText) {
    setSearch({ text: newText, categoryId: activeCategoryId })
  }

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0]
  const searchQuery = searchText.trim().toLowerCase()
  const isSearching = searchQuery.length > 0

  const categoryTitles = Object.fromEntries(
    categories.map((category) => [category.id, localize(category.title, languageCode)]),
  )

  const searchResults = isSearching
    ? categories.flatMap((category) =>
        searchEntries(category.entries, searchQuery, languageCode),
      )
    : []

  // The type filter for the open category (only when it has 2+ types).
  const filterTypes = activeCategory ? getFilterTypes(activeCategory.entries) : []
  const showTypeFilter = filterTypes.length > 1
  const activeTypeId =
    showTypeFilter &&
    typeFilter.categoryId === activeCategory?.id &&
    filterTypes.some((type) => type.id === typeFilter.typeId)
      ? typeFilter.typeId
      : 'all'

  const categoryTabs = categories.map((category) => ({
    id: category.id,
    label: categoryTitles[category.id],
  }))

  const notice = activeCategory ? localize(activeCategory.notice, languageCode) : ''

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

        {activeCategory && (
          <>
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
                    count: countResults(searchResults),
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
                <ResourceEntries
                  entries={searchResults}
                  categoryTitles={categoryTitles}
                  isSearch
                />
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
                {notice && (
                  <p className="resources__category-notice">
                    <Icon name="info" size={18} />
                    {notice}
                  </p>
                )}

                {showTypeFilter && (
                  <div
                    className="resources__types"
                    role="group"
                    aria-label={t('resources.typeFilterLabel')}
                  >
                    {[{ id: 'all', label: t('resources.allTypes') }, ...filterTypes].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        className={`resources__type ${activeTypeId === type.id ? 'is-active' : ''}`}
                        aria-pressed={activeTypeId === type.id}
                        onClick={() =>
                          setTypeFilter({ typeId: type.id, categoryId: activeCategory.id })
                        }
                      >
                        {localize(type.label, languageCode)}
                      </button>
                    ))}
                  </div>
                )}

                <ResourceEntries
                  // Remounting on a new type closes any section left open.
                  key={activeTypeId}
                  entries={filterEntriesByType(activeCategory.entries, activeTypeId)}
                  categoryTitles={categoryTitles}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
