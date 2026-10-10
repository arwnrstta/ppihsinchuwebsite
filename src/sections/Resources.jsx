import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import PlaceholderBadge from '../components/PlaceholderBadge.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { resourceCategories } from '../data/resources.js'
import './Resources.css'

/*
 * STUDENT RESOURCES
 * -----------------
 * An information hub built entirely from src/data/resources.js.
 * Adding a category or an item there makes it appear here automatically.
 *
 * Two ways to browse:
 *   1. Category tabs: shows the items of one category.
 *   2. Search box: when it contains text, the tabs are ignored and matching
 *      items from EVERY category are shown together.
 *
 * Which category is open is stored in App.jsx (not here) so that the
 * navbar dropdown can open a category.
 */

/* Gathers all the text of one resource so the search can look through it. */
function getSearchableText(resource) {
  return [
    resource.name,
    resource.tag,
    resource.description,
    resource.location,
    resource.notes,
    ...(resource.steps ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

export default function Resources({ activeCategoryId, onCategoryChange }) {
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
          .filter((resource) => getSearchableText(resource).includes(searchQuery))
          .map((resource) => ({ resource, categoryTitle: category.title })),
      )
    : []

  return (
    <section id="resources" className="section section--white" aria-labelledby="resources-title">
      <div className="container">
        <SectionHeading
          number="03"
          label="Student resources"
          title="The little things that make a big difference."
          description="Settling in is easier when someone has been there before. Practical guides for Indonesian students in Hsinchu."
          headingId="resources-title"
        />

        <Reveal className="resources__toolbar">
          <label className="resources__search">
            <Icon name="search" />
            <span className="visually-hidden">Search all resources</span>
            <input
              type="search"
              placeholder="Search all resources"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>
          <Tabs
            tabs={resourceCategories.map((category) => ({
              id: category.id,
              label: category.title,
            }))}
            activeId={activeCategory.id}
            onChange={(categoryId) => {
              // Choosing a category leaves search mode.
              setSearchText('')
              onCategoryChange(categoryId)
            }}
            label="Resource categories"
            idPrefix="resources"
            mobileSelect
          />
        </Reveal>

        <PlaceholderBadge className="resources__notice">
          <Icon name="alert" size={14} />
          Draft content. Always confirm details with the official source.
        </PlaceholderBadge>

        {isSearching ? (
          // aria-live announces the number of results to screen readers.
          <div className="resources__results" aria-live="polite">
            <p className="resources__intro">
              {searchResults.length}{' '}
              {searchResults.length === 1 ? 'result' : 'results'} for “{searchText.trim()}”
              <button
                type="button"
                className="text-link resources__clear"
                onClick={() => setSearchText('')}
              >
                Clear search
              </button>
            </p>
            <div className="resources__grid">
              {searchResults.map(({ resource, categoryTitle }) => (
                <ResourceCard
                  key={`${categoryTitle}-${resource.name}`}
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
            <p className="resources__intro">{activeCategory.intro}</p>
            <div className="resources__grid">
              {activeCategory.items.map((resource) => (
                <ResourceCard key={resource.name} resource={resource} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
